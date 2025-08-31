import React from 'react';
import {Calendar, Clock, Users, User, CreditCard, Hash} from 'lucide-react';
import type {Registration} from "@/types/get-users-details.type.ts";

interface RegistrationCardProps {
  registration: Registration;
}

interface StatusBadgeProps {
  status: string;
  type: 'registration' | 'payment' | 'competition';
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({registration}) => {
  const {competition, team, transaction} = registration;

  const formatDate = (dateInput: string | Date) => {
    if (!dateInput) return '-';
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number | undefined | null) => {
    if (!amount) return 'Rp0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const getCompetitionTypeIcon = (type: string) => {
    return type === 'TEAM' ? <Users className="w-4 h-4"/> : <User className="w-4 h-4"/>;
  };

  const getPaymentTypeDisplay = (paymentType?: string) => {
    if (!paymentType) return '';
    const types: { [key: string]: string } = {
      'qris': 'QRIS',
      'bank_transfer': 'Bank Transfer',
      'echannel': 'E-Channel',
      'credit_card': 'Credit Card'
    };
    return types[paymentType] || paymentType.toUpperCase();
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{competition.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              {getCompetitionTypeIcon(competition.type)}
              <span className="text-sm font-medium text-gray-600">{competition.type}</span>
              <StatusBadge status={competition.status ?? ''} type="competition"/>
            </div>
          </div>
          <StatusBadge status={registration.status ?? ''} type="registration"/>
        </div>

        <p className="text-gray-600 mb-4">{competition.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4"/>
              <span>Start: {formatDate(competition.startDate)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4"/>
              <span>End: {formatDate(competition.endDate)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4"/>
              <span>Registration Deadline: {formatDate(competition.registrationDeadline)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CreditCard className="w-4 h-4"/>
              <span>Fee: {formatCurrency(competition.registrationFee)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Hash className="w-4 h-4"/>
              <span>Registration ID: {registration.id}</span>
            </div>
          </div>
        </div>

        {team && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-3">Team: {team.name}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {team.participants.map((participant) => (
                <div key={participant.id} className="bg-white rounded-lg p-3 border">
                  <p className="font-medium text-gray-900 text-sm">{participant.name}</p>
                  <p className="text-xs text-gray-600">{participant.email}</p>
                  <p className="text-xs text-gray-600">{participant.phoneNumber}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Payment Status</p>
              <div className="flex items-center space-x-2 mt-1">
                <StatusBadge status={transaction?.status ?? 'PENDING'} type="payment"/>
                <span className="text-sm text-gray-600">
                  {getPaymentTypeDisplay(transaction?.paymentType)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Amount Paid</p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(transaction?.amount)}</p>
            </div>
          </div>

          {transaction?.transactionTime && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                Paid on {formatDate(transaction.transactionTime)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<StatusBadgeProps> = ({status}) => {
  const getStatusStyles = () => {
    const normalizedStatus = status?.toLowerCase?.() ?? '';

    switch (normalizedStatus) {
      case 'confirmed':
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {status?.toUpperCase?.() ?? ''}
    </span>
  );
};