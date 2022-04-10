import List from './LiftsList/list';
import LiftPage from './liftPage/LiftPage';
import CreateLift from './editLift/editLift';
import AddLift from './addLift/AddLift';
import { Empty } from 'antd';
export default function accountSwitch(state: any) {
 switch (state.activeView) {
  case '1':
   return <List />;
   break;
  case 'lift':
   return <LiftPage />;
   break;
  case 'editLift':
   return <CreateLift />;
   break;
  case 'addLift':
   return <AddLift />;
   break;
  default:
   return (
    <div style={{ marginTop: '200px' }}>
     <Empty />
    </div>
   );
   break;
 }
}
