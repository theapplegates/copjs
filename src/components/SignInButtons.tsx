import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { FaDiscord, FaGithub } from 'react-icons/fa';

import Button from '@/components/atoms/buttons/Button';

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export default function SignInButtons({ providers }: Props) {
  const { t } = useTranslation();

  return (
    <>
      {providers &&
        Object.values(providers)
          .filter((provider: any) => provider.name !== 'Credentials')
          .map((provider: any) => (
            <div key={provider.name}>
              <Button
                className="mb-3 w-full justify-center !py-2"
                color={
                  (provider.id === 'discord' && 'discord') ||
                  (provider.id === 'github' && 'github') ||
                  'primary'
                }
                size="small"
                clickHandler={() => signIn(provider.id)}
                leftIcon={
                  (provider.id === 'discord' && <FaDiscord size={16} />) ||
                  (provider.id === 'github' && <FaGithub size={16} />) ||
                  null
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
