pragma solidity >=0.4.18 <0.6.0;
/// @title A very simple, but gas conservative Proof Of Existence dapp
/// @author srinivas ratnam
/// @notice This is the bare bone implementation . After the final project submission, it will be extendent to enterprise grade.
/// @dev name of the contract ProofOfExistence
contract ProofOfExistence {

  /// @dev below 2 events are used to compare which design is gas saving
  event logNewSnapDetails(address indexed currentUserEvent, string snapEvent, uint timeEvent);
  event logsetgetDetails(address indexed currentUserEvent1, string snapEvent1, uint timeEvent1);
  //currentUser is indexed so that we can apply filter on the below event to get the list of snaps uploaded by that user

  address owner;
  /// @notice Design approach1 : I will use conventional pattern of storing the snapDetails in the struct snapDetail{} .
  /// @notice Whenever the details is added in setSnapDetails logNewSnapDetails will emit the log and present on the UI
  struct snapDetail {
    /// @dev this data type stores the ipfsHash value in string format.
    string snapHash;
    /// @dev the epoch time at which the snap was uploaded
    uint time;
    /// @dev who uploaded this snap
    address sender;
  }

  /// @dev below mapping is to search for the ipfsHash value provided, below will outout the struct snapDetail{}
  mapping(string => snapDetail)  snapDetails;

  function ProofOfExistence() public{
    owner = msg.sender;
  }
  /// @dev setSnapDetails functionimpleentation is as part of the approach 1. Which accepts string as ipfsHash and stores the values.
  function setSnapDetails(string memory _snapHash) public {
    //require(_snapHash.lenght == 0);
    snapDetail storage _snapDetail = snapDetails[_snapHash];

    _snapDetail.snapHash = _snapHash;
    _snapDetail.time = block.timestamp;
     _snapDetail.sender = msg.sender;

     /// 2Dev as soon as the abve values are updaed it will emit the log below.
    logNewSnapDetails(_snapDetail.sender, _snapDetail.snapHash, _snapDetail.time);

  }

  /// @dev Approach 2 : As soon as the snap in uploaded in IPFS, store the ipfsHash in the events directly without storing in struct.
  /// @dev Benifit
  function setgetsnapDetails(string memory _snap) public {

    uint blockTime;

    blockTime = block.timestamp;

    logsetgetDetails(msg.sender,_snap, blockTime );
  }

  /// @notice This function allows the owner only to kill this contract

  function kill() external{
    require(msg.sender == owner);
    selfdestruct(owner);

  }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    //7
  function() external{
      revert();
  }



}
