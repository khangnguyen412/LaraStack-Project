<!DOCTYPE html>
<html>

<head>
    <title>Reset Password</title>
</head>

<body>
    <h1>Hello, {{ $user->name ?? $user->email ?? 'User' }}</h1>
    <p>Click the link below to reset your password:</p>
    <a href="{{ $resetLink }}">Reset Password</a>
    <p>If you did not request this, please ignore.</p>
</body>

</html>