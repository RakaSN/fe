import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt", // Kita pakai token, bukan database session biar ringan
  },
  pages: {
    signIn: "/login", // Nanti kita bikin halaman login khusus di sini
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Cek apakah username & password sesuai dengan di .env
        const isValidUser = 
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD;

        if (isValidUser) {
          // Kalau benar, balikin data user (cuma id & nama aja)
          return { id: "1", name: "Super Admin", email: "admin@sekolah.com" };
        }

        // Kalau salah, balikin null (Login Gagal)
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };