import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { ActivityRecord, ActivityTypes } from '../types/Types';
import Http from './Http';
import { ComponentContext } from '../shared/ComponentContext';
import { nowLocale } from './Moment';
import { useSnackbar } from 'notistack';

interface WorkRecordsContext {
  workRecords: ActivityRecord[];
  addWorkRecord(activityType: ActivityTypes): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const WorkRecordsContext = createContext<WorkRecordsContext | null>(null);

const WorkRecordsProvider: React.FC = ({ children }) => {
  const [workRecords, setWorkRecords] = useState<ActivityRecord[]>([]);
  const context = useContext(ComponentContext)
  const { user } = context
  const { enqueueSnackbar } = useSnackbar();

  async function loadWorkRecords(): Promise<void> {
    console.log("user", user)
    if (!user) return
    Http.get({
      path: `/work-records?userId=${user.id}&date=${nowLocale().format("YYYY/MM/DD")}`,
      onError: (error: string) => {
        console.log("error", error)
        enqueueSnackbar('Invalid username', { variant: 'error' })
      },
      onSuccess: (activities: ActivityRecord[]) => {
        console.log("load", activities)
        setWorkRecords(activities)
      }
    })
  }

  useEffect(() => {
    loadWorkRecords();
  }, []);

  const addWorkRecord = useCallback(async (activityType: ActivityTypes) => {
    if (!user) return
    Http.post({
      path: `/work-records`,
      body: {
        "userId": user.id,
        "date": nowLocale().format("YYYY/MM/DD"),
        "time": nowLocale().format("HH:mm"),
        "activityType": activityType
      },
      onError: (error: string) => {
        console.log("error", error)
      },
      onSuccess: (response: any) => {
        loadWorkRecords();
        enqueueSnackbar('Checkin Registered!', { variant: 'success' })
      }
    })

  }, []);

  const increment = useCallback(async id => {
  }, []);

  const decrement = useCallback(async id => {
  }, []);

  const value = React.useMemo(
    () => ({ addWorkRecord, increment, decrement, workRecords }),
    [workRecords, addWorkRecord, increment, decrement],
  );

  return <WorkRecordsContext.Provider value={value}>{children}</WorkRecordsContext.Provider>;
};

function useWorkRecords(): WorkRecordsContext {
  const context = useContext(WorkRecordsContext);

  if (!context) {
    throw new Error(`useWorkRecords() must be used within a WorkRecordsProvider`);
  }

  return context;
}

export { WorkRecordsProvider, useWorkRecords };