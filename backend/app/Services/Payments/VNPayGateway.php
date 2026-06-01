<?php
namespace App\Services\Payments;

/**
 * interface
 */
use App\Contracts\PaymentGateway;


class VNPayGateway implements PaymentGateway {
    protected $config;

    public function __construct() {
        $this->config = config('payment.vnpay');
    }

    /**
     * Create payment
     */
    public function createUrl(array $orderData): string {
        $vnpayUrl = $this->config['url'];
        $vnp_TmnCode = $this->config['tmn_code'];
        $vnp_HashSecret = $this->config['hash_secret'];
        $vnp_ReturnUrl = $this->config['return_url'];
        $vnp_IpnUrl = $this->config['ipn_url'];

        // Create array data send to gateway
        $inputData = [
            "vnp_Version"    => "2.1.0",
            "vnp_TmnCode"    => $vnp_TmnCode,
            "vnp_Amount"     => $orderData['amount'] * 100, // convert to VND x100
            "vnp_Command"    => "pay",
            "vnp_CreateDate" => now()->format('YmdHis'),
            "vnp_CurrCode"   => "VND",
            "vnp_IpAddr"     => request()->ip(),
            "vnp_Locale"     => $orderData['locale'] ?? 'vn',
            "vnp_OrderInfo"  => $orderData['description'] ?? 'Thanh toan don hang',
            "vnp_OrderType"  => $orderData['order_type'] ?? 'billpayment',
            "vnp_ReturnUrl"  => $vnp_ReturnUrl,
            "vnp_TxnRef"     => $orderData['order_id'],
            "vnp_BankCode"   => $orderData['bank_code'] ?? '',
        ];

        // Add IPN URL if provided
        if ($vnp_IpnUrl) {
            $inputData['vnp_IpAddr'] = $vnp_IpnUrl;
        }

        // Sort array data
        ksort($inputData);
        $hashData = "";
        $query = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            switch ($i) {
                case 0:
                    $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
                    break;
                case 1:
                    $hashData .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                    break;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }
        $vnp_Url = "{$vnpayUrl}?{$query}";
        if ($vnp_HashSecret) {
            $vnpSecureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
            $vnp_Url .= "&vnp_SecureHash={$vnpSecureHash}";
        }

        return $vnp_Url;
    }

    /**
     * Get payment status
     */
    public function verify(array $requestData): bool {
        $vnp_HashSecret = $this->config['hash_secret'];
        $vnp_SecureHash = $requestData['vnp_SecureHash'] ?? '';
        unset($requestData['vnp_SecureHash'], $requestData['vnp_SecureHashType']); // Remove secure hash and secure hash type from array to check
        ksort($requestData);
        $hashData = "";
        $i = 0;
        foreach ($requestData as $key => $value) {
            switch ($i) {
                case 0:
                    $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
                    break;
                case 1:
                    $hashData .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                    break;
            }
        }
        $vnpSecureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
        return $vnpSecureHash === $vnp_SecureHash;
    }

    /**
     * Process IPN (Instant Payment Notification) and return payment information
     */
    public function processIPN(array $requestData): array {
        // VNPay send IPN by GET method to IPN URL.
        // Check signature
        if (!$this->verify($requestData)) {
            \Log::warning('VNPay IPN: Invalid signature', $requestData);
            return ['status' => 'error', 'message' => 'Invalid signature'];
        }

        $status = $requestData['vnp_TransactionStatus'] ?? '';
        $orderId = $requestData['vnp_TxnRef'] ?? '';
        $amount = $requestData['vnp_Amount'] / 100;
        $txnId = $requestData['vnp_TransactionNo'] ?? '';
        if ($status === '00') {
            return [
                'status'         => 'success',
                'order_id'       => $orderId,
                'transaction_id' => $txnId,
                'amount'         => $amount,
                'message'        => 'Payment successful',
            ];
        } else {
            return [
                'status'         => 'failed',
                'order_id'       => $orderId,
                'transaction_id' => $txnId ?? null,
                'amount'         => $amount,
                'message'        => "Payment failed with code: {$status}",
            ];
        }
    }

}
