// ** Reducers Imports
// import applicability from './applicability'

import Applicability from "./applicability";

const applicability = new Applicability()

const rootReducer = function () {

    return applicability.getApplicability()
}

export default rootReducer
