module.exports = (sequelize, Sequelize) => {
    const ProyectoDocumento = sequelize.define("proyecto_documento", {
      /*id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal("nextval('referencias_id_seq')")
      },*/
      archivo_id: {
        type: Sequelize.INTEGER
      },
      proyecto_id: {
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER
      }
    }, {
      tableName: 'proyecto_documento',
      timestamps: false
    });
  
    return ProyectoDocumento;
  };