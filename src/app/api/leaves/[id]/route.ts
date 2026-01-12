import { NextRequest, NextResponse } from 'next/server';
import { leaveDb } from '@/lib/db';

// GET - 获取单个休假记录
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leave = leaveDb.getById(params.id);
    
    if (!leave) {
      return NextResponse.json(
        { error: 'Leave not found' },
        { status: 404 }
      );
    }
    
    const formattedLeave = {
      id: leave.id,
      name: leave.name,
      contact: leave.contact,
      startDate: leave.start_date,
      endDate: leave.end_date,
      reason: leave.reason,
      createdAt: leave.created_at,
    };
    
    return NextResponse.json(formattedLeave);
  } catch (error) {
    console.error('Failed to fetch leave:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leave' },
      { status: 500 }
    );
  }
}

// PUT - 更新休假记录
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, contact, startDate, endDate, reason } = body;
    
    const updateData: Record<string, string | null> = {};
    if (name !== undefined) updateData.name = name;
    if (contact !== undefined) updateData.contact = contact;
    if (startDate !== undefined) updateData.start_date = startDate;
    if (endDate !== undefined) updateData.end_date = endDate;
    if (reason !== undefined) updateData.reason = reason;
    
    const success = leaveDb.update(params.id, updateData);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Leave not found' },
        { status: 404 }
      );
    }
    
    const updatedLeave = leaveDb.getById(params.id);
    
    const formattedLeave = {
      id: updatedLeave!.id,
      name: updatedLeave!.name,
      contact: updatedLeave!.contact,
      startDate: updatedLeave!.start_date,
      endDate: updatedLeave!.end_date,
      reason: updatedLeave!.reason,
      createdAt: updatedLeave!.created_at,
    };
    
    return NextResponse.json(formattedLeave);
  } catch (error) {
    console.error('Failed to update leave:', error);
    return NextResponse.json(
      { error: 'Failed to update leave' },
      { status: 500 }
    );
  }
}

// DELETE - 删除休假记录
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = leaveDb.delete(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Leave not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete leave:', error);
    return NextResponse.json(
      { error: 'Failed to delete leave' },
      { status: 500 }
    );
  }
}

