type StateManger = "REDUX" | "ZUSTAND" | "JOTAI" | "XSTATE";

type PoweredByProps = { varient?: StateManger };

export default function PoweredBy({ varient }: PoweredByProps) {
  const stateManger = (manager?: StateManger) => {
    switch (manager) {
      case "REDUX":
        return (
          <p>
            Powered by <a href="https://redux-toolkit.js.org/">Redux</a>
          </p>
        );
      case "ZUSTAND":
        return (
          <p>
            Powered by <a href="https://zustand-demo.pmnd.rs/">Zustand</a>
          </p>
        );
      case "JOTAI":
        return (
          <p>
            Powered by <a href="https://jotai.org/">Jotai</a>
          </p>
        );
      case "XSTATE":
        return (
          <p>
            Powered by{" "}
            <a href="https://stately.ai/docs/xstate-store">xstate/store</a>
          </p>
        );

      default:
        return (
          <p>
            Powered by <a href="https://dexie.org/">Dexie.js</a>
          </p>
        );
    }
  };

  return (
    <div className="text-content-tertiary flex w-full justify-center text-sm">
      {stateManger(varient)}
    </div>
  );
}
