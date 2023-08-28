export const AuthErrorMessage = ({ error }: { error: string[] }) => {
  return (
    <div
      className="bg-terracotta-10 text-terracotta-100 my-2 mt-0 rounded-md p-3"
      data-testid="auth-modal.error-message"
    >
      <p className="text-p-2">{error}</p>
    </div>
  );
};
