import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { jwtVerify, SignJWT } from 'jose';

// cookies options
const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

export async function POST(req) {
  const refreshToken = req.cookies.get('refreshToken');
    if (!refreshToken) {
        
        return NextResponse.json({ message: 'No refresh token found' }, { status: 401 });
    }
    const {userId} = jwtVerify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    if (!userId) {
       
        return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    }
    const accessToken = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRE)
        .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
    const newRefreshToken = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRE)
        .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET));
    if (!accessToken || !newRefreshToken) {
        return NextResponse.json({ message: 'Error in generating tokens' }, { status: 500 });
    }
    const response = NextResponse.json({
        message: 'Token refreshed',
        tokens: { accessToken, refreshToken: newRefreshToken },
    });
    response.cookies.set('accessToken', accessToken, cookiesOptions);
    response.cookies.set('refreshToken', newRefreshToken, cookiesOptions);
    return response;
}