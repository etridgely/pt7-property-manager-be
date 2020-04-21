const db = require("../../../database/db-config.js");

module.exports = {
  addUnit,
  findAllUnits,
  findUnitById,
  updateUnit,
  removeUnit,
};

function addUnit(unit) {
  return db("unit")
    .insert(unit, "id")
    .then((ids) => ({ id: ids[0] }));
}

function findAllUnits() {
  return (
    db("units")
      // .select("units.id","number","property_id","description","date_available","parking","type","cooling","heating","pets","laundry","fees","sqft","elementary","middle","high","district","p.img","address","city","state","zip","country","manager_id")
      .join("users as u", "units.manager_id", "=", "u.id")
      // .join("leaseterms as l", "units.lease_id", "=", "l.id")
      .join("property as p", "units.property_id", "=", "p.id")
  );
}

// prettier-ignore
function findUnitById(id) {
  return (
    db("units")
      .select("units.id","number","renter_id","lease_id","property_id","units.manager_id","description","listing_price","date_available","parking","type","cooling","heating","pets","laundry","fees","sqft","elementary","middle","high","district","p.img","address","city","state","zip","country","firstName","lastName")
      .join("users as u", "units.manager_id", "=", "u.id")
      // .join("leaseterms as l", "units.lease_id", "=", "l.id")
      .join("property as p", "units.property_id", "=", "p.id")
      .where({ "units.id": id })
      // .where({id})
      .first()
  );
}

function updateUnit(changes, id) {
  return db("unit").where({ id }).update(changes);
}

function removeUnit(id) {
  return db("unit").where({ id }).delete();
}
