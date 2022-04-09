import List from './LiftsList/list';
import LiftPage from './liftPage/LiftPage';
import CreateLift from './editLift/editLift';

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
  default:
   return 'Тут ничего нет';
   break;
 }
}
