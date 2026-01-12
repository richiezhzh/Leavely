import { NextRequest, NextResponse } from 'next/server';
import { leaveDb } from '@/lib/db';

// GET - 获取所有休假记录
export async function GET() {
  try {
    const leaves = leaveDb.getAll();
    
    // 转换字段名以匹配前端格式
    const formattedLeaves = leaves.map(leave => ({
      id: leave.id,
      name: leave.name,
      contact: leave.contact,
      startDate: leave.start_date,
      endDate: leave.end_date,
      reason: leave.reason,
      createdAt: leave.created_at,
    }));
    
    return NextResponse.json(formattedLeaves);
  } catch (error) {
    console.error('Failed to fetch leaves:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaves' },
      { status: 500 }
    );
  }
}

// POST - 创建新的休假记录
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, contact, startDate, endDate, reason } = body;
    
    if (!name || !contact || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const leave = leaveDb.create({
      name,
      contact,
      start_date: startDate,
      end_date: endDate,
      reason: reason || null,
    });
    
    // 转换字段名以匹配前端格式
    const formattedLeave = {
      id: leave.id,
      name: leave.name,
      contact: leave.contact,
      startDate: leave.start_date,
      endDate: leave.end_date,
      reason: leave.reason,
      createdAt: leave.created_at,
    };
    
    return NextResponse.json(formattedLeave, { status: 201 });
  } catch (error) {
    console.error('Failed to create leave:', error);
    return NextResponse.json(
      { error: 'Failed to create leave' },
      { status: 500 }
    );
  }
}

