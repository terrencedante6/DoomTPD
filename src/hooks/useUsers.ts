import { createSupabaseServerClient } from "@/lib/supabase/server";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useUsers: any = () => {
  const [allUsersData, setAllUsersData] = useState<any[]>([]);
  const [currentUserData, setCurrentUserData] = useState<any>([]);

  const createUser = async (props: any) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );

    const result = await supabase.auth.signUp({
      email: props.email,
      password: props.password,
      options: {
        data: {
          first_name: props.first_name,
          last_name: props.last_name,
          contact_number: props.contact_number,
          sex: props.sex,
          address: props.address,
          image_url: props.image_url,
          password: props.password,
          dob: props.dob,
        },
      },
    });

    return JSON.stringify(result);
  };
  const getUsers = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    );
    const result = await supabase.from("users").select(`
      id,
      email,
      first_name,
      last_name,
      contact_number,
      sex,
      address,
      image_url,
      dob
    `);
    type UsersWithJoin = QueryData<typeof result>;

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return setAllUsersData(data as UsersWithJoin);
  };
  const getUser = async (id: string, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data, error } = await supabase
      .from("users")
      .select(
        `
      id,
      email,
      first_name,
      last_name,
      image_url,
      address,
      contact_number,
      sex,
      dob,
      created_at,
      password
    `
      )
      .eq("id", id);
    if (error) return redirect("/application/users");

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentUserData(data);
  };
  const updateUser = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );
    const result = await supabase.auth.admin.updateUserById(props.id, {
      email: props.email,
      password: props.password,
      user_metadata: {
        email: props.email,
        first_name: props.first_name,
        last_name: props.last_name,
        image_url: props.image_url,
        address: props.address,
        contact_number: props.contact_number,
        sex: props.sex,
        dob: props.dob,
        password: props.password,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteEmployee = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    );
    const result = await supabase.auth.admin.deleteUser(props.id);
    await new Promise((resolve) => setTimeout(resolve, duration));

    redirect("/application/employees");
    return JSON.stringify(result);
  };

  return {
    // data
    allUsersData,
    currentUserData,

    // methods
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteEmployee,
  };
};
