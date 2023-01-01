/**
 * @name MuteNewGuild
 * @author RazerMoon
 * @authorId 162970149857656832
 * @description Automatically mutes newly joined guilds.
 * @source https://github.com/RazerMoon/BetterDiscordPlugins/blob/main/MuteNewGuild/MuteNewGuild.plugin.js
 * @updateUrl https://raw.githubusercontent.com/RazerMoon/BetterDiscordPlugins/main/MuteNewGuild/MuteNewGuild.plugin.js
 * @version 0.9.0
 */

module.exports = class MuteNewGuild {
    start() {
        this.FluxDispatcher = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps('dispatch', 'register'));
        this.GuildManager = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps('updateGuildNotificationSettings'));

        this.handleInvite = this.handleInvite.bind(this);
        this.FluxDispatcher.subscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
    }

    async handleInvite ({ invite: { guild: { id } } }) {
        const { updateGuildNotificationSettings } = this.GuildManager;
    
        updateGuildNotificationSettings(id, {
            muted: true,
            suppress_everyone: false,
            suppress_roles: false,
            mobile_push: true
        });
      }
  
    stop() {
        this.FluxDispatcher.unsubscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
    }
  };