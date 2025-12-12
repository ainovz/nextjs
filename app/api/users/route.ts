import { NextRequest, NextResponse } from 'next/server';

type User = {
  id: number;
  name: string;
  email: string;
};

// 임시 데이터 (실제로는 데이터베이스 사용)
const users: User[] = [
  { id: 1, name: '김철수', email: 'kim@example.com' },
  { id: 2, name: '이영희', email: 'lee@example.com' },
  { id: 3, name: '박민수', email: 'park@example.com' },
];

// GET /api/users - 모든 사용자 조회
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  // 쿼리 파라미터로 필터링
  if (name) {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    return NextResponse.json({
      users: filteredUsers,
      total: filteredUsers.length,
    });
  }

  return NextResponse.json({
    users,
    total: users.length,
  });
}

// POST /api/users - 새 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // 유효성 검사
    if (!name || !email) {
      return NextResponse.json(
        { error: 'name과 email은 필수입니다.' },
        { status: 400 }
      );
    }

    // 이메일 중복 체크
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 존재하는 이메일입니다.' },
        { status: 409 }
      );
    }

    // 새 사용자 생성
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
    };

    users.push(newUser);

    return NextResponse.json(
      {
        message: '사용자가 생성되었습니다.',
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: '잘못된 요청입니다.' },
      { status: 400 }
    );
  }
}

