'use client';

import { useEffect } from 'react';

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { Modal } from './Modal';
import { useRouter } from 'next/navigation';

import { useAuthModal } from '@/hooks/useAuthModal';

export const AuthModal = () => {
  //* Initializes Supabase client, Next.js router and session context.
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  //* Effect hook for handling session changes.
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  //* Handler for modal open state changes.
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Login into your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={['google']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#1DB954',
              },
            },
          },
        }}
      />
    </Modal>
  );
};
