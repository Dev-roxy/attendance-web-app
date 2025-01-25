import { NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';
import Student from '@/models/student.model';
import Teacher from '@/models/teacher.model';

// cookies options
const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

export async function POST(req) {
  const refreshToken = req.cookies.get('refreshToken').value;
    if (!refreshToken) {
        
        return NextResponse.json({
          message: 'No refresh token found',
          status: 401,
        });
    }
    const {userId} = jwtVerify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const {userType} = userId;

    if (userType === "student"){
        let student = await Student.findOne(userId);
        if (!student) {
            return NextResponse.json({
                message: 'No user found',
                status: 404,
            });
        }
        
        if (student.refreshToken !== refreshToken) {
            return NextResponse.json({
                message: 'Invalid refresh token',
                status: 401,
            });
        }

        const accessToken = await student.generateAccessToken();
        const newRefreshToken = await student.generateRefreshToken();

        student.refreshToken = newRefreshToken;
        await student.save({ validateBeforeSave: false });

        return NextResponse.json({
            accessToken,
            refreshToken: newRefreshToken,
            status: 200,
        });


    }
}