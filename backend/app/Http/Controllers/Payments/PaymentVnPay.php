<?php

namespace App\Http\Controllers\Payments;

use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Swagger
 */
use OpenApi\Attributes as OA;

/**
 * Controller
 */
use App\Http\Controllers\Controller;

/**
 * Contract Payment
 */
use App\Contracts\PaymentGateway;

/**
 * Resource VnPayVerify
 */
use App\Http\Resources\Payments\VnPayVerify;
use App\Http\Resources\Payments\VnPayIPN;

#[OA\Tag(name: 'VnPay Payment', description: 'VnPay Payment')]
class PaymentVnPay extends Controller {
    protected PaymentGateway $gateway;

    public function __construct(PaymentGateway $gateway) {
        $this->gateway = $gateway;
    }

    /**
     * Summary of VNPayCreateUrl: send payment request to VnPay
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function VNPayCreateUrl(Request $request) {
        $orderId = $request->input('order_id');
        $amount = $request->input('amount');

        $orderData = [
            'order_id'    => $orderId,
            'amount'      => $amount,
            'description' => "Checkout order # {$orderId}",
            'locale'      => 'vn',
        ];

        $url = $this->gateway->createUrl($orderData);
        return redirect()->away($url);
    }

    /**
     * Summary of VNPayVerify: receive payment status from VnPay after payment
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function VNPayVerify(Request $request) {
        $data = $request->all();
        $verify = $this->gateway->verify($data);
        $orderId = $data['vnp_TxnRef'] ?? $data['orderId'];
        $frontendUrl = env('FRONTEND_RETURN_URL', 'http://localhost:5173/payment-return');

        if ($verify) {
            return redirect()->away("{$frontendUrl}?status=success&order_id={$orderId}");
        } else {
            return redirect()->away("{$frontendUrl}?status=failed&order_id={$orderId}");
        }
    }

    /**
     * Summary of VNPayProcessIpn
     * @param Request $request
     * @return VnPayIPN
     * @throws BadRequestHttpException
     */
    #[OA\Get(
        path: '/api/v1/payment/vnpay/ipn',
        summary: 'Process IPN from VnPay',
        tags: ['VnPay Payment'],
        parameters: [
            new OA\Parameter(name: 'vnp_Amount', in: 'query', description: 'Amount', required: true, schema: new OA\Schema(type: 'integer', example: 10)),
            new OA\Parameter(name: 'vnp_BankCode', in: 'query', description: 'Bank Code', required: true, schema: new OA\Schema(type: 'string', example: 'ABC')),
            new OA\Parameter(name: 'vnp_BankTranNo', in: 'query', description: 'Bank Transaction Number', required: true, schema: new OA\Schema(type: 'string', example: '1234567890')),
            new OA\Parameter(name: 'vnp_CardType', in: 'query', description: 'Card Type', required: true, schema: new OA\Schema(type: 'string', example: 'VISA')),
            new OA\Parameter(name: 'vnp_OrderInfo', in: 'query', description: 'Order Information', required: true, schema: new OA\Schema(type: 'string', example: 'Checkout order %23 TEST123')),
            new OA\Parameter(name: 'vnp_PayDate', in: 'query', description: 'Payment Date', required: true, schema: new OA\Schema(type: 'string', example: '20220514123500')),
            new OA\Parameter(name: 'vnp_ResponseCode', in: 'query', description: 'Response Code', required: true, schema: new OA\Schema(type: 'string', example: '00')),
            new OA\Parameter(name: 'vnp_TmnCode', in: 'query', description: 'Merchant Code', required: true, schema: new OA\Schema(type: 'string', example: 'CH1Y2QXG')),
            new OA\Parameter(name: 'vnp_TransactionNo', in: 'query', description: 'Transaction Reference', required: true, schema: new OA\Schema(type: 'string', example: '1234567890')),
            new OA\Parameter(name: 'vnp_TransactionStatus', in: 'query', description: 'Transaction Status', required: true, schema: new OA\Schema(type: 'string', example: '00')),
            new OA\Parameter(name: 'vnp_TxnRef', in: 'query', description: 'Transaction Reference', required: true, schema: new OA\Schema(type: 'string', example: 'TEST123')),
            new OA\Parameter(name: 'vnp_SecureHash', in: 'query', description: 'Secure Hash', required: true, schema: new OA\Schema(type: 'string', example: '1234567890')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/VnPaysIPN'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ],
    )]
    public function VNPayProcessIpn(Request $request) {
        $data = $request->all();
        $result = $this->gateway->processIPN($data);

        if ($result) {
            return VnPayIPN::make(['code' => '00', 'message' => 'Confirm success',]);
        } else {
            throw new BadRequestHttpException('Confirm failed');
        }
    }

    public function VNPayGenerateHash(Request $request) {
        $data = [
            'vnp_Amount'            => '1000000',
            'vnp_BankCode'          => 'NCB',
            'vnp_BankTranNo'        => '20220514123456',
            'vnp_CardType'          => 'ATM',
            'vnp_OrderInfo'         => 'Checkout order # TEST123',
            'vnp_PayDate'           => '20220514123500',
            'vnp_ResponseCode'      => '00',
            'vnp_TmnCode'           => env('VNP_TMN_CODE'),
            'vnp_TransactionNo'     => '14000123',
            'vnp_TransactionStatus' => '00',
            'vnp_TxnRef'            => 'TEST123',
        ];
        ksort($data);
        $hashData = '';
        foreach ($data as $key => $value) {
            $hashData .= urlencode($key) . '=' . urlencode($value) . '&';
        }
        $secret = env('VNP_HASH_SECRET');
        $secureHash = hash_hmac('sha512', $hashData, $secret);
        return $secureHash;
    }

}
