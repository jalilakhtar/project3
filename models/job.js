// model for Jobs table
module.exports = function(sequelize, DataTypes) {
    const Job = sequelize.define("Job", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        job_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        job_link: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            unique: true
        }
    });
    return Job;
};