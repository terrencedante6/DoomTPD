// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { toast } from '@/components/ui/use-toast'; // Adjust the import path as needed
// import { useTransition } from 'react';
// import { useUsers } from '@/hooks/useUsers';
// import { Button } from '@/components/ui/button';
// import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { cn } from '@/lib/utils';
// import { Input } from 'postcss';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// const usersSchema = z.object({
//   first_name: z.string().min(1, { message: "First name is required" }),
//   last_name: z.string().min(1, { message: "Last name is required" }),
//   contact_number: z.string().min(1, { message: "Contact number is required" }),
//   sex: z.enum(["Male", "Female", "Other"]).default("Male"),
//   address: z.string().min(1, { message: "Address is required" }),
//   image_url: z.string().url().optional(),
//   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
//   repeat_password: z.string().min(8, { message: "Passwords must match" }),
//   dob: z.date().min(new Date(1900, 1, 1), { message: "Date of birth is required" }),
//   email: z.string().email({ message: "Must be a valid email" }),
// }).refine((data) => data.password === data.repeat_password, {
//   message: "Passwords don't match",
//   path: ["repeat_password"], // This shows the error at the repeat_password field
// });

// export default function usersForm() {
//   const [isPending, startTransition] = useTransition();
//   const { createEmployee } = useUsers(); // Ensure you have this function implemented

//   const form = useForm({
//     resolver: zodResolver(usersSchema),
//   });

//   async function onSubmit(data: z.infer<typeof usersSchema>) {
//     startTransition(async () => {
//       try {
//         const result = await createEmployee(data);
//         const { error } = result; // Assuming result is already a JavaScript object

//         if (error?.message) {
//           toast({
//             variant: "destructive",
//             title: "Error",
//             description: error.message,
//           });
//           return;
//         }

//         toast({
//           variant: "success",
//           title: "Success",
//           description: "Employee created successfully",
//         });

//       } catch (error) {
//         console.error("Registration Error:", error);
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "An unexpected error occurred.",
//         });
//       }
//     });
//   }

//   // Form UI goes here, using form.register for binding input fields

//   return (
// <form onSubmit={form.handleSubmit(onSubmit)} className="login-form-style">
//   <div className="form-content">
//     <FormField
//       control={form.control}
//       name="first_name"
//       render={({ field }) => (
//         <FormItem className="form-item">
//           <FormLabel className="form-label">First Name</FormLabel>
//           <FormControl className="form-control">
//             <Input
//               {...field}
//               className="login-input"
//               type="text"
//               placeholder="Enter First Name"
//             />
//           </FormControl>
//           <FormMessage className="form-message" />
//         </FormItem>
//       )}
//     />
//     {/* Repeat for other fields, applying common styles and components */}
//     <Button
//       type="submit"
//       className="submit-button login-button-style"
//     >
//       Create User
//     </Button>
//   </div>
// </form>
//   );
// }
