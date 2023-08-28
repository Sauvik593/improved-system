import { MobileMenu } from '~/common/ui/menu/mobile-menu';
import { AuthModal } from '~/modules/auth/ui/auth-modal';

export const Modals = () => {
  return (
    <>
      <MobileMenu />
      <AuthModal type="desktop" />
    </>
  );
};
