// app/routes/reviews.dashboard.tsx
import { UserRole } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { LoaderFunction, json } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { EmployeePastReviewsCard } from "~/components/reviews/employee/employee-past-reviews-card";
import EmployeeSelfAssessmentCard from "~/components/reviews/employee/employee-self-assessment-card";
import { SupervisorReviewDashboardCard } from "~/components/reviews/supervisor/supervisor-review-dashboard-list";
import { CardDescription, CardTitle } from "~/components/ui/card";
import { useUser } from "~/context/user-context";
import { getPastEmployeeReviews } from "~/services/reviews/get-past-employee-reviews.server";
import { getSession } from "~/services/session.server";
import { getManagedEmployees } from "~/services/user/get-managed-employees.server";

export const meta: MetaFunction = () => {
  return [{ title: "Reviews | Dashboard" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser = session.get("sessionKey");

  if (!sessionUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  const isSupervisorOrAdmin = sessionUser.roles.includes(UserRole.SUPERVISOR);

  if (isSupervisorOrAdmin) {
    const managedEmployees = await getManagedEmployees(
      sessionUser.id,
      sessionUser.companyId
    );
    return json({ managedEmployees });
  } else {
    const employeePastReviews = await getPastEmployeeReviews(sessionUser.id);
    return json({ employeePastReviews });
  }
};

export default function ReviewDashboard() {
  const { managedEmployees, employeePastReviews } =
    useLoaderData<typeof loader>();
  const user = useUser();
  const employeeId = user.id;

  // @ts-ignore
  const isUserEmployee = user.roles.includes(UserRole.EMPLOYEE);
  // @ts-ignore
  const isUserSupervisor = user.roles.includes(UserRole.SUPERVISOR);

  if (isUserSupervisor)
    return (
      <div className="space-y-2">
        <CardTitle>Ongoing Assessments</CardTitle>
        <CardDescription>Submit a new review.</CardDescription>
        <SupervisorReviewDashboardCard
          managedEmployees={managedEmployees}
          isReviewComplete={false}
        />
        <div className="pt-4"></div>
        <CardTitle>Past Assessments</CardTitle>
        <CardDescription>
          Check previous reviews from your managed employees.
        </CardDescription>
        <SupervisorReviewDashboardCard
          managedEmployees={managedEmployees}
          isReviewComplete={true}
        />
      </div>
    );
  <Separator />;
  if (isUserEmployee)
    return (
      <div className="space-y-2">
        <CardTitle>Start a Self-Assessment</CardTitle>
        <CardDescription>Submit a review of yourself.</CardDescription>
        <EmployeeSelfAssessmentCard />
        <div className="pt-4"></div>
        <CardTitle>Past Reviews</CardTitle>
        <CardDescription>Check previous reviews results.</CardDescription>
        <EmployeePastReviewsCard
          pastReviews={employeePastReviews}
          employee={user}
        />
      </div>
    );
}
