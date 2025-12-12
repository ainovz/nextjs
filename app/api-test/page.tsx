'use client';

import { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ApiTestPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // GET /api/users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users);
      setMessage(`${data.total}명의 사용자를 불러왔습니다.`);
    } catch (error) {
      setMessage('사용자 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // POST /api/users
  const createUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '홍길동',
          email: `hong${Date.now()}@example.com`,
        }),
      });
      const data = await response.json();
      setMessage(data.message || '사용자가 생성되었습니다.');
      fetchUsers();
    } catch (error) {
      setMessage('사용자 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // GET /api/hello
  const testHello = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('API 호출에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // GET /api/status
  const checkStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setMessage(`서버 상태: ${data.status} (가동 시간: ${Math.floor(data.uptime)}초)`);
    } catch (error) {
      setMessage('상태 확인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
          API 테스트 페이지
        </h1>

        {/* 버튼 그룹 */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={testHello}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            Hello API 테스트
          </button>
          <button
            onClick={checkStatus}
            disabled={loading}
            className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
          >
            서버 상태 확인
          </button>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700 disabled:bg-gray-400"
          >
            사용자 목록 조회
          </button>
          <button
            onClick={createUser}
            disabled={loading}
            className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-700 disabled:bg-gray-400"
          >
            새 사용자 생성
          </button>
        </div>

        {/* 메시지 표시 */}
        {message && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
            {message}
          </div>
        )}

        {/* 사용자 목록 */}
        {users.length > 0 && (
          <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
              사용자 목록
            </h2>
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
                >
                  <div>
                    <p className="font-medium text-black dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    ID: {user.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API 정보 */}
        <div className="mt-8 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
            API 엔드포인트
          </h2>
          <div className="space-y-2 font-mono text-sm">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-green-600">GET</span>{' '}
              /api/hello
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-green-600">GET</span>{' '}
              /api/status
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-green-600">GET</span>{' '}
              /api/users
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-blue-600">POST</span>{' '}
              /api/users
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-green-600">GET</span>{' '}
              /api/users/[id]
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-orange-600">PUT</span>{' '}
              /api/users/[id]
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-red-600">DELETE</span>{' '}
              /api/users/[id]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

