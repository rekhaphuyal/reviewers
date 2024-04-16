import { Prisma, PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { createUserDtoBody } from "../validators/create.user.validators";
import { z } from "zod";
const prisma = new PrismaClient();
export const createUser = async (user: z.infer<typeof createUserDtoBody>) => {
  try {
    const { email, password, isAdmin } = user;
    return await prisma.user.create({
      data: {
        email: email,
        password: await bcrypt.hash(password as string, 10),
        isAdmin,
      },
    });
  } catch (e: any) {
    if (e.code == "P2002") {
      throw Boom.conflict("email duplicate vayo");
    }
    throw e;
  }
};
// user: any
export async function login(body: any) {
  const { password, email } = body;

  const user = await prisma.user.findFirstOrThrow({ where: { email } });

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    // Password does not match
    // If you want to throw a http error, you can. This is throw internal server error
    throw Error("Password not correct");
  }

  // Generate a token
  const accesstoken = jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin }, 
    process.env.REFRESH_TOKEN_KEY as string,
     {
    expiresIn: "1h",
  });

  const refreshtoken = jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin }, 
    process.env.REFRESH_TOKEN_KEY as string,
     {
    expiresIn: "7d",
  });
  // Return the token to the client
  return { success: true, accesstoken, refreshtoken };
}
export const remove = async (userId: any) =>{
  try{
      return  await prisma.user.delete({where: {id:userId}})

  }catch(err:any){
     
  
  console.log(err)
  if(err.code === 'P2003'){
  throw Boom.notFound("Todos delete garnu hola pahila ")
}else{
throw err
}
}
}