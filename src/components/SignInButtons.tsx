import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { getProviders, signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';

import Button from './atoms/buttons/Button';

export default function SignInButtons() {
  const { t } = useTranslation(); // Get the translation function

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null); // State for the providers

  useEffect(() => {
    (async () => {
      // Get the providers and set the state
      setProviders(await getProviders());
    })();
  }, []);

  return (
    <>
      {providers &&
        Object.values(providers)
          .filter((provider: any) => provider.name !== 'Credentials')
          .map((provider: any) => (
            <div key={provider.name}>
              <Button
                className="mb-3 w-full justify-center !py-2"
                color="cornflower-blue"
                size="small"
                clickHandler={() => signIn(provider.id)}
                leftIcon={
                  (provider.id === 'discord' && <FaDiscord size={16} />) || null
                }
              >
                {t('Sign in with {{provider}}', {
                  provider: provider.name
                })}
              </Button>
            </div>
          ))}
    </>
  );
}
