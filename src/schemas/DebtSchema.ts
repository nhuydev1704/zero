import Realm, {ObjectSchema} from 'realm';
import User from './UserSchema';
import Debtor from './DebtorSchema';

class Debt extends Realm.Object<Debt> {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  amount!: number;
  debtor!: Debtor;
  user!: User;
  date!: Date;

  static schema: ObjectSchema = {
    name: 'Debt',
    properties: {
      _id: 'objectId',
      description: 'string',
      amount: 'double',
      debtor: 'Debtor',
      user: 'User',
      date: 'date',
    },
    primaryKey: '_id',
  };
}

export default Debt;