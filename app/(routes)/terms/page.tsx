import React from "react";

export default function PageTermsConditions() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white text-slate-800 antialiased">
      <header className="border-b border-slate-200 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Terms and Conditions
        </h1>
        <p className="text-sm font-medium text-slate-500">
          Last Updated: July 7, 2026
        </p>
      </header>

      <section className="mb-8">
        <p className="text-base leading-relaxed text-slate-600">
          Welcome to{" "}
          <span className="font-semibold text-slate-900">Manager</span>. These
          Terms and Conditions ("Terms") govern your access to and use of our
          corporate management platform (the "Service"). By accessing or using
          the Service, you agree to be bound by these Terms.
        </p>
      </section>

      <main className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span>1.</span> Account Registration and Corporate Use
          </h2>
          <ul className="space-y-3 pl-5 list-disc text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-800">Company Management:</strong>{" "}
              The Service allows registered users to create, manage, and monitor
              company profiles ("Companies") within their dashboard. You agree
              to provide accurate and updated business information.
            </li>
            <li>
              <strong className="text-slate-800">
                Security Responsibilities:
              </strong>{" "}
              You are entirely responsible for maintaining the confidentiality
              of your account credentials and for regulating user roles and
              access permissions within your company's space.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span>2.</span> Calendar and Task Regulation
          </h2>
          <ul className="space-y-3 pl-5 list-disc text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-800">Task Scheduling:</strong> The
              platform provides a centralized Calendar tool to schedule, assign,
              and regulate corporate tasks, events, and business timelines.
            </li>
            <li>
              <strong className="text-slate-800">Data Accuracy:</strong> While
              we ensure high availability of our scheduling tools, you are
              responsible for the accuracy of the dates, deadlines, and tasks
              regulated within your calendar workspace.
            </li>
            <li>
              <strong className="text-slate-800">
                Operational Continuity:
              </strong>{" "}
              We are not liable for business disruptions, missed deadlines, or
              organizational errors resulting from user misconfigurations in the
              Calendar tool.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span>3.</span> Acceptable Use and Data Ownership
          </h2>
          <ul className="space-y-3 pl-5 list-disc text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-800">Data Ownership:</strong> You
              retain full ownership and intellectual property rights over all
              company profiles, calendar events, and analytical data uploaded to
              the dashboard.
            </li>
            <li>
              <strong className="text-slate-800">Prohibited Activities:</strong>{" "}
              You agree not to reverse engineer the platform, attempt to breach
              security protocols, or use the Service to store or transmit
              malicious data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span>4.</span> Subscription and Plan Upgrades
          </h2>
          <ul className="space-y-3 pl-5 list-disc text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-800">Features and Limits:</strong>{" "}
              Access to extended features—such as adding unlimited companies or
              premium calendar automations—may require a paid subscription. You
              can manage your subscription at any time using the "Upgrade Plan"
              interface.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
