import { useParams } from 'next/navigation';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { FaDiscord, FaGithub } from 'react-icons/fa';

import Button from '@/components/atoms/buttons/Button';
import { getDictionariesClient } from '@/i18n';
import { getTranslator } from '@/utils/localization';

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export default function SignInButtons({ providers }: Props) {
  const params = useParams();

  const t = getTranslator(getDictionariesClient(params?.lang));

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
                clickHandler={() => signIn(provider.id, {})}
                leftIcon={
                  (provider.id === 'discord' && <FaDiscord size={16} />) ||
                  (provider.id === 'github' && <FaGithub size={16} />) ||
                  null
                }
              >
                {t('sign_in_with', { value: provider.name as string })}
              </Button>
            </div>
          ))}
    </>
  );
}
