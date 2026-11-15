const prisma = require('../../lib/prisma');



// Basic queries

exports.createMember = async (first_name, last_name, email, password) => {
  return prisma.members.create({
    data: {
      first_name,
      last_name,
      email,
      password,
    },
  });
};


exports.updateMembership = async (id) => {
  return prisma.members.update({
    where: { id },
    data: { is_member: true},
  });
};

//MISC queries
exports.findByEmail = async (email) => {
  return prisma.members.findUnique({
    where: { email },
  });
};

exports.findById = async (id) => {
  return prisma.members.findUnique({
    where: { id },
  });
};



