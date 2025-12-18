import type { User } from "@/types/User";

export const dummyUsers: User[] = [
  {
    id: 10,
    first_name: "Charles",
    last_name: "Argawanon",
    password: "$2a$12$dummyhashedpassword1",
    email: "22102797@usc.edu.ph",
    course: "BSCS",
    department: "Computer Science",
    bio: "Passionate about web development and data analytics.",
    profile_picture: "newaccount.png",
    deleted_at: null,
    roles: ["ROLE_USER"],
    deleted: false
  },
  {
    id: 12,
    first_name: "Maria",
    last_name: "Santos",
    password: "$2a$12$dummyhashedpassword2",
    email: "12314245@usc.edu.ph",
    course: "BSIT",
    department: "Information Technology",
    bio: "Interested in cybersecurity and modern web technologies.",
    profile_picture: "newaccount.png",
    deleted_at: null,
    roles: ["ROLE_USER"],
    deleted: false
  },
  {
    id: 15,
    first_name: "Juan",
    last_name: "Dela Cruz",
    password: "$2a$12$dummyhashedpassword3",
    email: "93437284@usc.edu.ph",
    course: "BSEng",
    department: "Engineering",
    bio: "Loves reviewing technical proposals and project management.",
    profile_picture: "newaccount.png",
    deleted_at: null,
    roles: ["ROLE_USER"],
    deleted: false
  }
];
