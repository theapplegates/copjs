# Todo's

- Send email for password reset
- Set new password page for password reset
- Simple Dashboard for logged in users
- Profile page for logged in users
- Profile settings page for logged in users
- Autofill colors for input fields based on theme (light/dark)

- Storybook Preview Tailwind Fix

## tRPC

- Translations for TRPCClientError / zod (ex. "Invalid email")
- SignUp tRPC Route check password confirmation
- Structure tRPC routes (userRouter, authRouter, etc.)
- add adminProcedure like protectedProcedure, publicProcedure

<pre>
  next-dev.js?3515:20 TRPCClientError: [
    {
      "code": "too_small",
      "minimum": 3,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "String must contain at least 3 character(s)",
      "path": [
        "name"
      ]
    },
    {
      "validation": "email",
      "code": "invalid_string",
      "message": "Invalid email",
      "path": [
        "email"
      ]
    },
    {
      "code": "too_small",
      "minimum": 6,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "String must contain at least 6 character(s)",
      "path": [
        "password"
      ]
    }
  ]
  </pre>
