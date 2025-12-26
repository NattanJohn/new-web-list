'use client';

import React, { Component, ReactNode } from 'react';
import { EmptyState } from '@/components/atoms/EmptyState/EmptyState';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <EmptyState
          title="Algo deu errado"
          message={this.state.error?.message || 'Ocorreu um erro inesperado'}
          actions={[
            {
              label: 'Tentar novamente',
              onClick: () => this.setState({ hasError: false, error: undefined }),
            },
            {
              label: 'Voltar para início',
              href: '/',
            },
          ]}
        />
      );
    }

    return this.props.children;
  }
}
