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

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/users/:id - 특정 사용자 조회
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const userId = parseInt(id);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json(
      { error: '사용자를 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}

// PUT /api/users/:id - 사용자 정보 수정
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    const body = await request.json();
    const { name, email } = body;

    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 업데이트
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;

    return NextResponse.json({
      message: '사용자 정보가 수정되었습니다.',
      user: users[userIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: '잘못된 요청입니다.' },
      { status: 400 }
    );
  }
}

// DELETE /api/users/:id - 사용자 삭제
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const userId = parseInt(id);

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json(
      { error: '사용자를 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  return NextResponse.json({
    message: '사용자가 삭제되었습니다.',
    user: deletedUser,
  });
}

