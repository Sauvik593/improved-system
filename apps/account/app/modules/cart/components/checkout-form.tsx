import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import { Button } from '@kyero/ui';

export const CheckoutForm = () => {
  const { t } = useTranslation();
  const checkoutFetcher = useFetcher();

  return (
    <checkoutFetcher.Form
      method="post"
      className={cn({
        ['opacity-60']: checkoutFetcher.state === 'submitting',
      })}
    >
      <fieldset disabled={checkoutFetcher.state === 'submitting'}>
        <Button
          variant="full"
          buttonType="blue"
          message={t('ui.cart.boostOrder')}
          className="lg:w-full"
          type="submit"
        />
      </fieldset>
      <input type="hidden" name="action" value="checkout" />
    </checkoutFetcher.Form>
  );
};

CheckoutForm.displayName = 'CheckoutForm';
