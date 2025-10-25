type Credentials = {
  email: string;
  password: string;
};

type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type AuthResponse = {
  user: AuthUser;
  token: string;
};

const mockUser: AuthUser = {
  id: "1",
  email: "admin@example.com",
  name: "Demo Admin",
};

export async function login({ email }: Credentials): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    user: { ...mockUser, email },
    token: "mock-token",
  };
}

export async function register({ email }: Credentials): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    user: { ...mockUser, id: "2", email },
    token: "mock-token-registered",
  };
}

export async function requestPasswordReset(email: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    success: email.length > 0,
  };
}
