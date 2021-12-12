function applyExtraSetup(sequelize) {
	const { employee, skillmap } = sequelize.models;

	employee.hasMany(skillmap);
	skillmap.belongsTo(employee);
}

module.exports = { applyExtraSetup };