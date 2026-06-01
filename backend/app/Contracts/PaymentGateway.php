<?php
namespace App\Contracts;

interface PaymentGateway {

    /**
     * Create payment url
     * 
     * @param array $orderData Order data (example: ['order_id' => ..., 'amount' => ..., 'description' => ...])
     * @return void
     */
    public function createUrl(array $orderData): string;

    /**
     * Verify payment
     * 
     * @param array $requestData Data query string or form data from gateway
     * @return void
     */
    public function verify(array $requestData): bool;

    /**
     * Process IPN (Instant Payment Notification) and return payment information
     * 
     * @param array $requestData Data query string or form data from gateway
     * @return void
     */
    public function processIPN(array $requestData): array;
}
