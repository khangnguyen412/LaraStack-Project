<!DOCTYPE html>
<html>

<head>
    <title>Stripe Test</title>
    <script src="https://js.stripe.com/v3/"></script>
</head>

<body>
    <h2>Thanh toán qua Stripe</h2>
    <div id="error-message"></div>
    <form id="payment-form">
        <input type="hidden" id="session-id" value="{{ $session_id }}">
        <button id="submit-button">Thanh toán $10</button>
    </form>
    <script>
        const stripe = Stripe("{{ $publishable_key }}");
        const sessionId = document.getElementById('session-id').value;
        document.getElementById('submit-button').addEventListener('click', () => {
            stripe.redirectToCheckout({
                sessionId: sessionId
            }).then((result) => {
                document.getElementById('error-message').innerText = result.error.message;
            });
        });
    </script>
</body>

</html>
