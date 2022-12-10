import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(user, process.env.NEXT_PUBLIC_SANITY_JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { signToken };
