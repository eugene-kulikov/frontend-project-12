import ChannelCreating from './ChannelCreating.jsx';
import ChannelRenaming from './ChannelRenaming.jsx';
import ChannelDeleting from './ChannelDeleting.jsx';

const modals = {
  addChannel: ChannelCreating,
  renameChannel: ChannelRenaming,
  removeChannel: ChannelDeleting,
};

export default (name) => modals[name];
