const prisma = require('../../lib/prisma');



// Basic queries

exports.getAllForMember = async () => { // Fetch all rows
  const data = await prisma.messages.findMany({
      select: {
        id: true,
        title: true,
        text: true,
        timestamp: true,
        members: {
         select: { first_name: true }
        }
      }
  }); // Query DB

  return data.map(({members, ...msg}) => ({
      ...msg,
      author: members.first_name,
  }));
};

exports.getAllForNAM = async () => {
  return prisma.messages.findMany({
    select: {
      title: true,
      text: true
    }
  });
};

exports.createMessage = async (member_id, title, message) => {
  return prisma.messages.createMany({
    data: { 
      member_id,
      title, 
      text: message,  
    },
  });
};


exports.deleteMessage = async (id) => {
  return prisma.messages.delete({
    where: {
       id: +id 
      },
  });
};
