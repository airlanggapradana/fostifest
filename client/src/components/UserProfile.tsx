import React from 'react';
import {Mail, Phone, Building, UserCheck} from 'lucide-react';
import type {User} from "@/types/get-users-details.type.ts";

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({user}) => {
  const formatDate = (dateInput: Date | string | null | undefined) => {
    if (!dateInput) return '-';
    let date: Date;
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } else {
      return '-';
    }
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <UserCheck className="w-4 h-4 mr-1"/>
            {user.role}
          </div>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>Member since</p>
          <p className="font-medium">{formatDate(user.createdAt)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Mail className="w-5 h-5 text-gray-400"/>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Phone className="w-5 h-5 text-gray-400"/>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Phone</p>
            <p className="text-sm text-gray-600">{user.phone}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Building className="w-5 h-5 text-gray-400"/>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Institution</p>
            <p className="text-sm text-gray-600">{user.institusi}</p>
          </div>
        </div>
      </div>
    </div>
  );
};