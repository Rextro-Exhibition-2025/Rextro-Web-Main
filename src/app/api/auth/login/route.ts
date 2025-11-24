import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { phone, password } = await req.json();

    // Validation
    if (!phone || !password) {
      return NextResponse.json(
        { error: 'Please provide phone number and password' },
        { status: 400 }
      );
    }

    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error logging in. Please try again.' },
      { status: 500 }
    );
  }
}
