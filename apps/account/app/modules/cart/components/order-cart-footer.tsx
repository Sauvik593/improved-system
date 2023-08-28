import { ClearForm } from './clear-form';
import { CheckoutForm } from './checkout-form';

export const OrderCartFooter = () => (
  <footer className="flex items-center justify-between gap-4 border-t border-sierra-night-10 p-4 md:py-8">
    <ClearForm />
    <CheckoutForm />
  </footer>
);

OrderCartFooter.displayName = 'OrderCartFooter';
