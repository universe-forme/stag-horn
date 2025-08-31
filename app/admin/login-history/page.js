'use client';
import { useGetAdminLoginHistoryByUsername } from '../../../lib/hooks';
import { useAdminAuth } from '../../../components/AdminAuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

export default function AdminLoginHistoryPage() {
  const { adminSession } = useAdminAuth();
  const loginHistory = useGetAdminLoginHistoryByUsername(
    adminSession?.username || 'waziradmin', 
    50
  );

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusBadge = (success) => {
    return success ? (
      <Badge className="bg-green-100 text-green-800">Success</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Failed</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Login History</h1>
        <p className="text-gray-600">Recent login attempts for admin account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Login Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          {loginHistory && loginHistory.length > 0 ? (
            <div className="space-y-4">
              {loginHistory.map((attempt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">
                        {attempt.username}
                      </span>
                      {getStatusBadge(attempt.success)}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <div>Time: {formatDate(attempt.loginTime)}</div>
                      {attempt.ipAddress && (
                        <div>IP: {attempt.ipAddress}</div>
                      )}
                      {attempt.failureReason && (
                        <div className="text-red-600">
                          Reason: {attempt.failureReason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No login history found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
