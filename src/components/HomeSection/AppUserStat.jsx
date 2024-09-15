import CountUp from "react-countup";

const AppUserStat = () => {
  const parcelsBooked = 1200;
  const parcelsDelivered = 850;
  const usersOnSite = 300;
  return (
    <>
      <section className="text-center">
        <h1 className="text-4xl text-center text-headL dark:text-headD font-sans font-semibold mb-6">
          User Insights & Stats
        </h1>
        <div className="flex justify-around items-center">
          <div className="stat-item">
            <h3 className="text-xl font-semibold">Parcels Booked</h3>
            <p className="text-2xl font-bold">
              <CountUp end={parcelsBooked} duration={2} />
            </p>
          </div>
          <div className="stat-item">
            <h3 className="text-xl font-semibold">Parcels Delivered</h3>
            <p className="text-2xl font-bold">
              <CountUp end={parcelsDelivered} duration={2} />
            </p>
          </div>
          <div className="stat-item">
            <h3 className="text-xl font-semibold">Users On Site</h3>
            <p className="text-2xl font-bold">
              <CountUp end={usersOnSite} duration={2} />
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppUserStat;
