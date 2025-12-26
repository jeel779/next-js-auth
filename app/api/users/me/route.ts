import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest){
  try {
    const userId=getDataFromToken(request)
    const user=await User.findById({_id:userId}).select("-password");
    if(!user){
      return NextResponse.json({error:"invalid token"},{status:400})
    } 
    return NextResponse.json({
      message:"user found",
      data:user
    })
  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 400});
  }

}