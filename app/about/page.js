import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-8 md:px-28 py-8 text-white min-h-[85vh]">
      <h1 className="text-3xl font-bold mb-4">About Get Me a Chai</h1>
      <p className="text-sm md:text-base text-gray-300 mb-8 max-w-4xl leading-relaxed">
        Get Me a Chai is a crowdfunding platform designed for creators to fund
        their projects with the support of their fans. It's a space where your
        fans can directly contribute to your creative endeavors by buying you a
        chai. Unlock the potential of your fanbase and bring your projects to
        life.
      </p>

      {/* How It Works Section */}
      <h2 className="text-xl font-bold mb-6">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="flex items-start gap-4">
          <div className="bg-slate-800 p-3 rounded-full flex items-center justify-center">
            {/* Group/Fans Icon */}
            <img
              src="/group.gif"
              alt="Fans Want to Collaborate"
              width={64}
              height={64}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Fans Want to Collaborate</h3>
            <p className="text-gray-400 text-sm mt-1">
              Your fans are enthusiastic about collaborating with you on your
              projects.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-slate-800 p-3 rounded-full flex items-center justify-center">
            {/* Coin/Support Icon */}
            <img
              src="/coin.gif"
              alt="Support Through Chai"
              width={64}
              height={64}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Support Through Chai</h3>
            <p className="text-gray-400 text-sm mt-1">
              Receive support from your fans in the form of chai purchases,
              directly contributing to your project funding.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Lists */}
      <div className="space-y-6 text-gray-300">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Benefits for Creators
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>Direct financial support from your fanbase</li>
            <li>Engage with your fans on a more personal level</li>
            <li>Access to a platform tailored for creative projects</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Benefits for Fans
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>
              Directly contribute to the success of your favorite creators
            </li>
            <li>Exclusive rewards and perks for supporting creators</li>
            <li>Be part of the creative process and connect with creators</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Benefits of Collaboration
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>
              Unlock new opportunities through collaboration with fellow
              creators
            </li>
            <li>Expand your network and reach a wider audience</li>
            <li>Combine skills and resources to create innovative projects</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Community Engagement
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>
              Interact with a supportive community of like-minded individuals
            </li>
            <li>Receive valuable feedback and encouragement from peers</li>
            <li>
              Participate in discussions and events centered around your
              interests
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Access to Resources
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>
              Gain access to resources such as tutorials, templates, and tools
            </li>
            <li>Receive guidance and mentorship from experienced creators</li>
            <li>Stay updated on industry trends and best practices</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Recognition and Exposure
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>
              Showcase your work to a global audience and gain recognition
            </li>
            <li>Feature in promotional materials and campaigns</li>
            <li>
              Build your portfolio and increase your credibility as a creator
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Supportive Community
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>
              Join a community that values creativity, diversity, and
              inclusivity
            </li>
            <li>Find encouragement and inspiration from fellow members</li>
            <li>
              Collaborate on projects and share resources for mutual growth
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About - Get Me A Chai",
};
