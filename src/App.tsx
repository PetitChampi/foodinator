import { useState, useEffect } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { PlannerTab } from "@/components/tabs/PlannerTab";
import { ScheduleTab } from "@/components/tabs/ScheduleTab";
import { GroceryTab } from "@/components/tabs/GroceryTab";
import { OfflineStatus } from "@/components/OfflineStatus";
import { Modal } from "@/components/Modal";
import { ModalProvider } from "@/contexts/ModalContext";

type TabType = "planner" | "grocery" | "schedule";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const savedTab = localStorage.getItem("foodinator_active_tab");
    return (savedTab as TabType) || "planner";
  });

  useEffect(() => {
    localStorage.setItem("foodinator_active_tab", activeTab);
  }, [activeTab]);

  return (
    <ModalProvider>
      <div>
        <OfflineStatus />

        <div className="container">
          {activeTab === "planner" && <PlannerTab />}
          {activeTab === "schedule" && <ScheduleTab />}
          {activeTab === "grocery" && <GroceryTab />}

          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <Modal />
      </div>
    </ModalProvider>
  );
}

export default App;
