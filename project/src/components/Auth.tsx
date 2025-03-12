import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '../lib/store';

export default function Auth() {
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-[#282828] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome to Eduverse</h2>
      <SupabaseAuth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#22c55e',
                brandAccent: '#16a34a',
                brandButtonText: 'white',
                defaultButtonBackground: '#282828',
                defaultButtonBackgroundHover: '#1f1f1f',
              },
              space: {
                inputPadding: '12px',
                buttonPadding: '12px',
              },
              borderWidths: {
                buttonBorderWidth: '1px',
                inputBorderWidth: '1px',
              },
              radii: {
                borderRadiusButton: '8px',
                buttonBorderRadius: '8px',
                inputBorderRadius: '8px',
              },
            },
          },
          style: {
            button: {
              border: '1px solid #404040',
              borderRadius: '8px',
              padding: '12px',
              height: 'auto',
              fontSize: '14px',
            },
            input: {
              backgroundColor: '#1f1f1f',
              border: '1px solid #404040',
              borderRadius: '8px',
              padding: '12px',
              color: 'white',
            },
            label: {
              color: '#d1d5db',
              fontSize: '14px',
              marginBottom: '4px',
            },
            message: {
              color: '#ef4444',
              fontSize: '14px',
              marginTop: '4px',
            },
            anchor: {
              color: '#22c55e',
              fontSize: '14px',
              textDecoration: 'none',
            },
          },
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email address',
              password_label: 'Password',
              button_label: 'Sign in',
              loading_button_label: 'Signing in...',
              social_provider_text: 'Sign in with {{provider}}',
              link_text: "Already have an account? Sign in",
            },
            sign_up: {
              email_label: 'Email address',
              password_label: 'Create a Password',
              button_label: 'Sign up',
              loading_button_label: 'Signing up...',
              social_provider_text: 'Sign up with {{provider}}',
              link_text: "Don't have an account? Sign up",
            },
          },
        }}
        providers={[]}
        theme="dark"
        redirectTo={window.location.origin}
      />
    </div>
  );
}